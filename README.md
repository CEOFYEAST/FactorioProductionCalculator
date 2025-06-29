# Factorio Production Calculator

A web app created to aid users in designing their Factorio factories.

Link:
https://fpc-app.com

## Summary

The main functionality of the app centers around production chains. Users will be able to visualize production chains, as well as add and remove products from any step in these chains. All the user need do is input the item/s their factory requires, and the app will handle all the necessary calculations.

Lots of apps like this already exist, such as this wonderful website: 
https://kirkmcdonald.github.io/calc.html#data=1-1-110&items=advanced-circuit:f:1

However, I plan to implement user profiles; this will allow users to continue modeling the production chains of their factories as they grow over time. Also, I've put alot of work into modeling processes with code that other websites don't cover such as train throughput.

## Current Release

The current release is the Save Slots & Security release; this release includes a system for editing and saving calculated production data across sessions for up to three factories. This release also takes steps to increase the overall security of the site; passwords are now hashed upon entering the server, and user sessions are stored in a secure fashion on the backend. 

Creating this release involved implementing secure server sessions, adding hashing and length requirements for passwords, writing APIs for save slots and user account functionality, creating a package and manual testing dashboard for the backend route handlers, and designing a visual interface for the save slots menu. I hope you enjoy!

## Next Steps

My plan going forwards is to create a better visual interface for the calculator, and add crafter and energy use calculations to the package.

## Keep Up With Updates

I've been posting updates and insights on the project to my development instagram account. I'll try and get a proper blog up soon so you don't have to use that infernal app.

Link:
https://www.instagram.com/ceofyeast/?igsh=MXRyOXRycjR3M3piMw%3D%3D&utm_source=qr
