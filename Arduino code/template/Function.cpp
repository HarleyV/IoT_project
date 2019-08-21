#include "Function.h"

Function::Function(String type, String name, String topic){
  this->type = type;
  this->name = name;
  this->topic = topic;
}

Function::Function(){
}

String Function::getTopic(){
  return this->topic;
}

String Function::getName(){
  return this->name;
}

String Function::getType(){
  return this->type;
}
