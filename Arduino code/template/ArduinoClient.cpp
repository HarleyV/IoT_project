#include "ArduinoClient.h"

String* getArray(LinkedList<String>);
void fillJsonArray(JsonArray, LinkedList<String>);
void fillJsonArray(JsonArray, LinkedList<Function>);

ArduinoClient::ArduinoClient() {
  this->clientID = CLIENT_ID;
  this->password = PASSWORD;

  ///////////////////////////////////////////////////////////////////
  //             Write Topics and Functionalities Here             //
  ///////////////////////////////////////////////////////////////////
  
  //Topics
  this->topics.add(this->clientID + "/setup");
  this->topics.add(this->clientID + "/register");

  //Functionalities
  //(type, name, topic)
  this->functions.add(Function("power", "Main Power", "/power"));
  
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
}

String ArduinoClient::getClientID(){
  return this->clientID;
}

bool ArduinoClient::checkCredentials(String clientID, String enteredPassword){
  return enteredPassword == this->password && clientID == this->clientID;
}

String ArduinoClient::getTopic(int index){
  return this->topics.get(index);
}

int ArduinoClient::getTopicSize(){
  return this->topics.size();
}

void ArduinoClient::addUser(String uid){
  this->users.add(uid);
}

String ArduinoClient::getJSONData(){
  //Create json document
  StaticJsonDocument<512> doc;

  //Add Single Value Properties to document
  doc["clientID"]           = this->clientID;
  doc["name"]               = NAME;
  //doc["description"]        = DESCRIPTION;

  //Add Array Properties to document
  JsonArray topics          = doc.createNestedArray("topics");
  JsonArray users           = doc.createNestedArray("users");
  JsonArray functions       = doc.createNestedArray("functions");

  //Fill json arrays 
  fillJsonArray(topics, this->topics);
  fillJsonArray(users, this->users);
  fillJsonArray(functions, this->functions);

  //Serialize the document and return the output
  String output;
  serializeJson(doc, output);
  return output;
}

String* getArray(LinkedList<String> list){
  int size = list.size();
  String newArray[size];
  
  for(int i = 0; i < size; i++){
     newArray[i] = list.get(i);
  }

  return newArray;
}

void fillJsonArray(JsonArray jsonArray, LinkedList<String> list){
  for(int i=0; i<list.size(); i++){
    jsonArray.add(list.get(i));
  }
}

void fillJsonArray(JsonArray jsonArray, LinkedList<Function> functions){

  for(int i=0; i<functions.size(); i++) {
      JsonObject function = jsonArray.createNestedObject();
      function["type"] = functions.get(i).getType();
      function["name"] = functions.get(i).getName();
      function["topic"] = functions.get(i).getTopic();
      
      //For some reason empty objects are being added after adding a function
      //This line removes that empty object
      //jsonArray.remove(i+1);
  }
}
