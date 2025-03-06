<!--
Loading/Reloading
    Will need a method for loading a factory into the view
    - can be called by a lifecycle hook
    Will need to update various things whenever a factory is loaded
    - menus will need to be refreshed
    - local lists of items, such as a local list of input items, will need to be refreshed
    - the actual components representing the nodes of the factory will need to be refreshed
    Will need a method for reloading a factory
    - could just re-use the loading method, but it could lend to efficiency and understandibility if I seperate the two 

Menus
    Could use a form that redirects to a method instead of an HTTPS request for the menus

Node Output Data
 - The # of crafters required to meet the node’s demand
 - The node’s demand
 - Visual link to the other “child” nodes that require the given “parent” node
 - The portion of the parent node’s demand required by each child node


-->

<!--

LoadFactory()
ReloadFactory()

RefreshNodes()
RefreshMenus()
RefreshInputs()

-->