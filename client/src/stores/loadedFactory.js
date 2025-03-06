/**
 * Will contain the loaded factory
 * 
 * The factory will be initialized to an empty object
 * 
 * Will expose methods for IRPTU requests
 * - Method for adding an input
 * - Method for removing an input
 * 
 * Will expose a list of user-demand input
 * - Will be refreshed using a method from the modules whenever the loaded factory is updated
 * 
 * Will expose a list of valid item IDs
 * 
 * Will have access to all the methods of the calculator module
 * - All the CORS on the factory object itself will be carried out in this module
 * - The loaded factory store will simply expose the methods listed above
 * 
 * Alternatives/Improvements
 * - Ability to remove portions, or all of the IRPTU for any given item
 * - Storing inputs seperate from the loaded factory data object so they don't have to be parsed out every time they're required
 * - Could use cookies to maintain the loaded factory between sessions
 */

/**

Object LoadedFactory
TimeUnit TimeUnit
List<Object> UserInputs
List<String> ValidIDs

AddInput(string ItemID, uint amount, TimeUnit tU)
RemoveInput(string ItemID, uint amount)
HandleFactoryUpdate()
LoadFactory(Object toLoad)
ClearFactory()

 */