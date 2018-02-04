import axios from "axios";

export default {

  //ALL THE GODDAMN GETS
  //Message Get

  getMessage: function(id){
    return axios.get("/api/message/" + id);
  },

  //Event Gets

  // Gets specific event
  getEvent: function(id) {
    return axios.get("/api/event/"+ id);
  },
  // Gets events based on category
  getEventsCategory: function(category) {
    return axios.get("/api/event/" + category);
  },

 // Gets events based on category
  getFeatured: function(){
    return axios.get("/api/event/");
  },

//User Gets--These may all be redundant!
  getUser: function(id){
    return axios.get("/api/user/checkAuth");
  },

  //Logout--May be redundant
  getUserLogout: function(id){
    return axios.get("/api/user/logout/"+ id);
  },

  //All the goddamn posts!
  //Message Post
  postMessage: function(){
    return axios.post("/api/message/");
  },

  //Event posts
  postEvent: function(){
    return axios.post("/api/event");
  },
  postEventUpdate: function(id){
    return axios.post("/api/event/" + id);
  },

  //User Posts
  //Initial post of the user
  postUser: function(){
    return axios.post("/api/user/");
  },
  //updating user attributes
  postUserUpdate: function(id){
    return axios.post("/api/user/"+id);
  },

  //Lonely update
  updateUser: function(id){
    return axios.post("/api/user/" + id);
  },

  //ALL THE DELETES
  deleteMessage: function(id){
    return axios.delete("/api/message/delete/" + id);
  },

  deleteEvent: function(id){
    return axios.delete("/api/event/" + id);
  },

  deleteUser: function(id){
    return axios.delete("/api/user/" + id);
  }

};
