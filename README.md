### Facemesh with custom landmarks

[misc_demo.webm](https://user-images.githubusercontent.com/23271049/201835184-dcebbd8a-bb08-473e-8b94-697f0e3749f4.webm)


This demo provides a working example of a facemesh made with ✨A E S T H E T I C ✨ dots.
<br/>
Why? because I think it looks more hacker than using the default line segments.


### Explanation
The `results.multiFaceLandmarks` is an array of objects called `landmarks` that contains all the points to build a facemesh. So, for this demo we're going to customize the `FACEMESH_TESSELATION` collection, that is an array of arrays where each array contains 2 indexes: one for the first point, contained in one object from the `landmarks`collection, and another one for the second point. Once we got the 2 points, we can draw them in the canvas 😎
<br/>
<br/>
*You can see the results, landmarks and FACEMESH_TESSELATION colecctions saved into json file in the `misc` folder*

Jasiel Guillen, 2022.
