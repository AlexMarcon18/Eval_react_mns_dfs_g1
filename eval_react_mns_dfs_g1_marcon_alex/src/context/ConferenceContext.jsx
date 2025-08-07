import React, { createContext, useContext, useReducer, useCallback } from 'react';
import ApiService from '../services/api';

const ConferenceContext = createContext();

export const useConferences = () => {
  const context = useContext(ConferenceContext);
  if (!context) {
    throw new Error('useConferences must be used within a ConferenceProvider');
  }
  return context;
};

// Actions
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CONFERENCES: 'SET_CONFERENCES',
  ADD_CONFERENCE: 'ADD_CONFERENCE',
  UPDATE_CONFERENCE: 'UPDATE_CONFERENCE',
  DELETE_CONFERENCE: 'DELETE_CONFERENCE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const conferenceReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_CONFERENCES:
      return { ...state, conferences: action.payload, loading: false, error: null };
    
    case ACTIONS.ADD_CONFERENCE:
      return { 
        ...state, 
        conferences: [...state.conferences, action.payload],
        loading: false,
        error: null 
      };
    
    case ACTIONS.UPDATE_CONFERENCE:
      return {
        ...state,
        conferences: state.conferences.map(conf => 
          conf.id === action.payload.id ? action.payload : conf
        ),
        loading: false,
        error: null
      };
    
    case ACTIONS.DELETE_CONFERENCE:
      return {
        ...state,
        conferences: state.conferences.filter(conf => conf.id !== action.payload),
        loading: false,
        error: null
      };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Initial state
const initialState = {
  conferences: [],
  loading: false,
  error: null
};

export const ConferenceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(conferenceReducer, initialState);

  // Actions
  const fetchConferences = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const conferences = await ApiService.getAllConferences();
      dispatch({ type: ACTIONS.SET_CONFERENCES, payload: conferences });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, []);

  const createConference = useCallback(async (conferenceData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const newConference = await ApiService.createConference(conferenceData);
      dispatch({ type: ACTIONS.ADD_CONFERENCE, payload: newConference });
      return newConference;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const updateConference = useCallback(async (id, conferenceData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const updatedConference = await ApiService.updateConference(id, conferenceData);
      dispatch({ type: ACTIONS.UPDATE_CONFERENCE, payload: updatedConference });
      return updatedConference;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const deleteConference = useCallback(async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await ApiService.deleteConference(id);
      dispatch({ type: ACTIONS.DELETE_CONFERENCE, payload: id });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  const value = {
    ...state,
    fetchConferences,
    createConference,
    updateConference,
    deleteConference,
    clearError
  };

  return (
    <ConferenceContext.Provider value={value}>
      {children}
    </ConferenceContext.Provider>
  );
};