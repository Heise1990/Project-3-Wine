# Project-3-Wine

## Overview

For this project, we dove into the wonderful world of wine to study what goes into making the best quality wines, & how you could determine the quality of a wine just from reading a review of a particular wine from a wine sommelier, more simply known as a wine expert. We conducted this analysis using two datasets, one containing reviews & ratings of different wines from around the world, and one detailing the chemical makeups & qualities of a list of red & white wines.

### Analysis: Wine Reviews

For this analysis, we utilized the dataset containing wine reviews from known wine sommeliers. Using a number of different machine learning models from python's Skikit-learn library, we created a model that can predict the given quality of a wine from the review alone with a 96% accuracy, with the chosen model as Random Forest Classifier.

### Analysis: Wine Composition

In this analysis, we sought to use machine learning to determine both the color of a given wine & the alcohol % of a given wine using characteristics in the wine such as density, PH, acidity & sulphates. We determined that most models were able to predict the color of the wine with almost perfect accuracy, ranging from 99-100%, largely due to sulfur_dioxide being on average 3 times larger in white wines than in red wines, making the color easier to predict. In determining the alcohol % of the wine, we bucketed the alcohol % into 4 buckets based on the quartiles of the data. Ultimately we found the random forest classifier to be the best model for predicting this, with an accuracy of 79%. Oddly, we also found all of the models to be significantly better at predicting the highest & lowest categories of alcohol %, but struggled with the buckets in the middle of the data.




