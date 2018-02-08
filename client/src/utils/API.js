import {Component} from "react";
import axios from "axios";
import {authObj} from "../authenticate";

export const API = {

  //ALL THE GODDAMN GETS
  //Message Get
  getMessage : id=> {
    return axios.get("/api/message/" + id);
  },

  //Event Gets

  // Gets specific event
  getEvent:  id=> {
    return axios.get("/api/event/"+ id);
  },
  // Gets events based on category
  getEventsCategory:  category=> {
    return axios.get("/api/event/" + category);
  },

 // Gets events based on category
  getFeatured:  ()=>{
    return axios.get("/api/event/");
  },

//User Gets--These may all be redundant!
  getUser:  id=>{
    return axios.get("/api/user/checkAuth");
  },

  //Logout--May be redundant
  getUserLogout: id=>{
    return axios.get("/api/user/logout/"+ id);
  },

  //All the goddamn posts!
  //Message Post
  postMessage:  ()=>{
    return axios.post("/api/message/");
  },

  //Event posts
  postEvent: event =>{
    axios
      .post("/api/event/", event)
      .then(result =>{
        },)
      .catch(err=> console.log(err));  
  },

  postEventUpdate:  id=>{
    return axios.post("/api/event/" + id);
  },

  //User Posts
  //Initial post of the user
  postUser:  ()=>{
    return axios.post("/api/user/");
  },
  //updating user attributes
  postUserUpdate:  id=>{
    return axios.post("/api/user/"+id);
  },

  //Lonely update
  updateUser:  id=>{
    return axios.post("/api/user/" + id);
  },

  //ALL THE DELETES
  deleteMessage:  id=>{
    return axios.delete("/api/message/delete/" + id);
  },

  deleteEvent:  id=>{
    return axios.delete("/api/event/" + id);
  },

  deleteUser:  id=>{
    return axios.delete("/api/user/" + id);
  }

};

