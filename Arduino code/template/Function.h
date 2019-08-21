#ifndef Function_h
#define Function_h

#include <ArduinoJson.h>
#include <WString.h>

class Function {
  private:
    String type;
    String name;
    String topic;
  public:
    Function(String, String, String);
    Function();
    String getTopic();
    String getName();
    String getType();
    //String addJSONData(JsonArray);
    //bool exists();
};

#endif
