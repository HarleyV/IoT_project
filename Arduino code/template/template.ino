#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>
#include <ArduinoJson.h>

#include "arduino_secrets.h"
#include "ArduinoClient.h"

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);
ArduinoClient client;
String        clientID = CLIENT_ID;

//LED setup
int LED = 7;

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  //Setup LED
  pinMode(LED, OUTPUT);
  
  connectToWifi();
  connectToMQTT();
  
  subscribeToTopics();

  publish("setup_device", clientID);  
}

void loop() {
  manageMessage();
}

void processMessage(String topic, String message){
  /////////////////////////////////////
  //Write your own if statements here//
  /////////////////////////////////////
  
  if(topic == clientID + "/led")
    switchLED(message);
    
  /////////////////////////////////////
  /////////////////////////////////////
  else if(topic == clientID + "/setup")
    setupClient(message);
  else if(topic == clientID + "/register")
    registerClient(message);
  else
    Serial.println("Could not process message");
}

////////////////////////////////////////////////////
//          Write Control Functions Here          //
////////////////////////////////////////////////////

void switchLED(String message){
  if(message == "on")
    digitalWrite(LED, HIGH);
  else if(message == "off")
    digitalWrite(LED, LOW);
}

////////////////////////////////////////////////////
//          End of Control Functions              //
////////////////////////////////////////////////////

// General Functions
void manageMessage(){
  int messageSize = mqttClient.parseMessage();
  if (messageSize) {
    Serial.print("Received a message with topic '");
    Serial.print(mqttClient.messageTopic());
    Serial.print("', length ");
    Serial.print(messageSize);
    Serial.println(" bytes:");
    
    String topic = mqttClient.messageTopic();
    String message = readMessage();

    processMessage(topic, message);
  }
}

void connectToWifi(){
 // attempt to connect to Wifi network:
  Serial.print("Attempting to connect to WPA SSID: ");
  Serial.println(_SSID);
  while (WiFi.begin(_SSID, _PASS) != WL_CONNECTED) {
    // failed, retry
    Serial.print(".");
    delay(5000);
  }

  Serial.println("You're connected to the network");
  Serial.println();
}

void connectToMQTT(){
  // Each client must have a unique client ID
  mqttClient.setId(clientID);
  
  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(BROKER);

  if (!mqttClient.connect(BROKER, PORT)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    while (1);
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();
}

String readMessage(){
  String msg;

  while (mqttClient.available()) {
    msg += (char)mqttClient.read();
  }

  return msg;
}

void publish(String topic, String message){
  Serial.print("Sending message to topic: ");
  Serial.println(topic);
  Serial.print(message);
  mqttClient.beginMessage(topic);
  mqttClient.print(message);
  mqttClient.endMessage();
}

void setupClient(String message){
  DynamicJsonDocument doc(2048);
  deserializeJson(doc, message);

  Serial.println("message: " + message);
  
  JsonArray array = doc.as<JsonArray>();
  Serial.println("Setting up Client: ");
  for(JsonVariant v : array) {
    Serial.println(v.as<String>());
    client.addUser(v.as<String>());
  }
}

void registerClient(String message){
  Serial.println("Recieved Message: " + message);
  //Parse the data from the message
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, message);

  String user_id    = doc["uid"];
  String client_id  = doc["clientID"];
  String password   = doc["password"];

  //Output the recieved data
  Serial.println("UID: " + user_id);
  Serial.println("Client ID: " + client_id);
  Serial.println("Password: " + password);
  
  if(client.checkCredentials(client_id, password)){
    //Publish a JSON Object representing the Arduino Client
    client.addUser(user_id);

    publish("add_user", getAddUserData(user_id));

    publish("add_device", client.getJSONData());
  } else {
    //Handle error
    publish("error", "ERROR: Client ID or password is incorrect");
  }
}

void subscribeToTopics(){
  for(int i = 0; i < client.getTopicSize(); i++){
    Serial.print("Subscribing to topic: ");
    Serial.println(client.getTopic(i));
    Serial.println();
    mqttClient.subscribe(client.getTopic(i));
  }
}

String getAddUserData(String uid){
  StaticJsonDocument<128> doc;
  doc["clientID"] = clientID;
  doc["uid"] = uid;

  String output;
  serializeJson(doc, output);
  return output;
}
