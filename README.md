# simplemindmaps
A simple mind map interface built with the HTML5 canvas

Most of the mind mapping tools around seem significantly bloated. 
The aim of this project is to create a simple, portable and extensible mind mapping tool.
I intend to use this as the backbone for a larger mind mapping project.

Added Handlebars and Express to build a minimal web interface for initial testing, demo and template for use. My intention is for the underlying library to be entirely independent of these.

# Please Note:
This is in the very earliest stages of development and *is not yet functional*.

Developed:
- Loading and Exporting of Existing Mindmaps
- Binding of HTML5 Canvas to Canvas class
- Drawing cycle
- Binding of Mouse Input to Canvas class and passing to Objects
- Point collision for ellipse objects

Todo:
- Object handling of input
- Calculate coordinates of drawing when canvas is transformed
- Text handling - drawing and keyboard input
- Linking of connectors to labelledOval nodes (currently just independent objects)
- Drag and drop functionality
- Toolbar
- Data models and database facade
- UI wrapper for server implementation
- UI testing + testing for drawing cycle

Future Optimizations:
- More efficient drawing cycle (rerun on environment change rather than animationFrame)
- More efficient collision handling (currently, the input passing just cycles through the objects which is fine for small data sets)

