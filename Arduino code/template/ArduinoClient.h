#ifndef ArduinoClient_h
#define ArduinoClient_h

#include <LinkedList.h>
#include <ArduinoJson.h>
#include <WString.h>
#include "Function.h"
#include "arduino_secrets.h"

class ArduinoClient {
  public:
    ArduinoClient();

    String getClientID();
    int getTopicSize();
    String getTopic(int);
    String getJSONData();
    void addUser(String);
    bool checkCredentials(String, String);
    
  private:
    String clientID;
    String password;
    
    String name;
    String description;
    
    LinkedList<String> users;
    LinkedList<String> topics;
    LinkedList<String> connectedDevices;
    LinkedList<Function> functions;
};

#endif
