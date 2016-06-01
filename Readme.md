# Awesome Neo4j Browser

Awesome Neo4j Browser is a open-source browser for neo4j (graph databases), based on pure front-end stack.

![Screenshot](http://7xk81c.com1.z0.glb.clouddn.com/awesome-neo4j-browser.png)

## What can I do with the browser

The main purpose of this project is to simplify the creation of a graph visualisation for [neo4j](http://www.neo4j.org). And enable the capability of secondary development.
It's based on [sigmaJS](http://www.sigmajs.org), [Linkurious](http://linkurio.us/) and their plugins. Theme is based on [Admin-LTE](https://github.com/almasaeed2010/AdminLTE)

I have almost the same functionality of the native neo4j browser. But currently, it hasn't taken Nodejs and webpack tech, the dependent libs are put under /css and /js.


## How to use it
 * Just download it, open index.html, open setting panel, change the settings and run cypher.

### How to make changes

 * My JS code is in awesome-neo4j-browser.js & utils.js, other files are third party libs.
 * My Css code is in awesome-neo4j-browser.css, other files are third party libs.
 * Feel free to make changes to these file if you like :)



Notice: you must have a neo4j server running. You can configure the location of your server on the config panel.

## TODO
 * Currently, it is the first version integrated many functionalities, and I am consider refactoring it to make it more extendable and scalable.
 * Let me know if you have interest in it.