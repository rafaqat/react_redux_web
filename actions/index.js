import fetch from 'isomorphic-fetch';
import { url } from '../constants';
import axios from 'axios'; 

export const EDIT_NEW_LIST = 'EDIT_NEW_LIST';
export const ADD_NEW_LIST_CLICK = 'ADD_NEW_LIST_CLICK';
export const ADD_NEW_LIST_POST = 'ADD_NEW_LIST_POST';
export const NEW_LIST_POST = 'NEW_LIST_POST';
export const NEW_LIST_POST_RESULT = 'NEW_LIST_POST_RESULT';
export const REQUEST_LISTS = 'REQUEST_LISTS';
export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const INVALIDATE_LISTS = 'INVALIDATE_LISTS';
export const EDIT_SIGN_UP_FORM = 'EDIT_SIGN_UP_FORM';
export const EDIT_SIGN_IN_FORM = 'EDIT_SIGN_IN_FORM';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_POST = 'SIGN_IN_POST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export function editNewList(newListItem) {
  return { 
  	type: EDIT_NEW_LIST, 
  	newListItem 
  }
}

export function addNewListClick() {
  return { 
    type: ADD_NEW_LIST_CLICK
  }
}

export function addNewListPost() {
  return (dispatch, getState) => {
    dispatch(newListPost())
    // var data = new FormData();
    const postdata = getState().newList.newListItem
    return fetch('http://localhost:3000/lists', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        list: postdata
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      // console.log('addNewListPost',data);
      dispatch(newListPostResult());
      dispatch(receiveLists(data));
    })
    // .catch(handleApiError);
  }
}

function newListPost() {
  return {
    type: NEW_LIST_POST
  }
}

function newListPostResult(json) {
  return {
    type: NEW_LIST_POST_RESULT,
    lists: json
  }
}

export function invalidateLists() {
  return {
    type: INVALIDATE_LISTS
  }
}

function requestLists() {
  // console.log('Actions REQUEST_LISTS');
  return {
    type: REQUEST_LISTS
  }
}

function receiveLists(json) {
  // console.log('Actions RECEIVE_LISTS', json);
  return {
    type: RECEIVE_LISTS,
    lists: json,
    receivedAt: Date.now()
  }
}

function fetchLists() {
  return dispatch => {
    dispatch(requestLists())
    return fetch('http://localhost:3000/lists', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveLists(json)))
  }
}

function shouldFetchLists(state) {
  const lists = state.allLists.lists
  if (!lists) {
    return true
  } else if (lists.isFetching) {
    return false
  } else {
    return lists.didInvalidate
  }
}

export function fetchListsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchLists(getState())) {
      return dispatch(fetchLists())
    }
  }
}

// Axios Testing Muninn Huginn

export function editSignUpForm(signUpFormItem) {
  return { 
    type: EDIT_SIGN_UP_FORM, 
    signUpFormItem 
  }
}

export function editSignInForm(signInFormItem) {
  return { 
    type: EDIT_SIGN_IN_FORM, 
    signInFormItem 
  }
}

export function signIn() {
  return (dispatch, getState) => {
    dispatch(signInPost());
    axios.post(url + '/auth/sign_in', {
      email: getState().signInForm.login,
      password: 'testtest',
    })
    .then( res => {
      // console.log('SUCCESS res', res);
      // console.log('res.headers', res.headers);
      dispatch(signInSuccess(res.headers));
    })
    .catch( err => {
      // console.log('ERROR err.response', err.response);
      // console.log('err.response.data.errors.full_messages', err.response.data.errors.full_messages);
      dispatch(signInError(err.response.data.errors));
    });
  }
}

function signInPost() {
  return {
    type: SIGN_IN_POST
  }
}

function signInSuccess(headers) {
  return {
    type: SIGN_IN_SUCCESS,
    headers
  }
}

function signInError(errors) {
  return {
    type: SIGN_IN_ERROR,
    errors
  }
}
