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

The current release is the Production Calculator release; this release was created to show off my progress on the production calculator, which is a core feature of the website. The user can create a production chain, add and remove demand from this production chain, clear the chain entirely, and recalculate the time unit of the chain. The user's inputs, as well as the intermediary demand calculated as a result of said inputs, are dynamically displayed by the site. This new functionality can be found under the "Production Calculator" tab.

Creating this release involved writing a package, creating an automated testing suite for that package, and coding a visual interface to expose the functionality of the package to the user.

The current user interface for the calculator is super gross; I plan on revamping all the visuals for the final release.

## Next Steps

My plan going forwards is to create a better visual interface for the package, add crafter data calculation to the package, and leverage the user system to store prod chain data in user accounts.

## Keep Up With Updates

I've been posting updates and insights on the project to my development instagram account. I'll try and get a proper blog up soon so you don't have to use that infernal app.

Link:
https://www.instagram.com/ceofyeast/?igsh=MXRyOXRycjR3M3piMw%3D%3D&utm_source=qr
