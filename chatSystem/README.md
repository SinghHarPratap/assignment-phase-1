# ChatroomAssignmnet

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## Git Layout
 Chatsystem Consist of mainly three folders namely: node modules, server and src. "node_modules" is autmatically generated which consist of all the required node modules. Sever fold consist of server side code which involves routes,server.js and socket.js. Whereas, src holds the angular code which basically a client side code.

 ## Data Structures
 Data Structures are a specialized means of organizing and storing data in computers in such a way that we can perform operations on the stored data more efficiently. In this assignment we mainly have two data structure's namely group data structure and user data structure. In group data structure we have different fields of data like objid, id, group_name, members, channel,and channelname. The code snippet given below portrays the data structure's.

 <img src="images/data_structure_group.JPG" width="200">
 <img src="images/data_structure_user.JPG" width="100">
 
## Angular Architecture

#Services

For data or logic that isn't associated with a specific view, and that we want to share across components, we create a service class. A service class definition is immediately preceded by the @Injectable() decorator as shown in figure given below. The decorator provides the metadata that allows other providers to be injected as dependencies into our class.

<img src="images/Services_files.JPG" width="200">
<img src="images/group_services.JPG" width="200">

#Models
<img src="images/model_angular.JPG" width="200">
This file(user.ts) is model file.
<img src="images/model_angular2.JPG" width="200">

#Components

Components are the main building block for Angular applications. Each component consists of:

* An HTML template that declares what renders on the page
* A Typescript class that defines behavior
A CSS selector that defines how the component is used in a template
* Optionally, CSS styles applied to the template

<img src="images/component_files.JPG" width="200">



