---
layout: post
title: Changing a query string value in ASP.NET MVC
tags: asp.net
---
I've come across more than one occasion where a link on a page only needs to modify one or more query string values. Take for example a simple pagination list:

``` csharp
<ul>
   @for (int i = 1; i < Model.PageCount; i++)
   {
      <li>
         <a href="@Url.Action("Index", "Home", new { page = i })">@i</a>
      </li>
   }
</ul>
```

The `action` and `controller` declaration in `@Url.Action("Index", "Home", new { page = i })` is redundant. A more succinct call would be easier on the eyes (and fingers):

`@Url.RouteValueChange(new { page = i})`

This should generate the current URL but with an updated `page` query string value. We can achieve this with a simple `UrlHelper` extension method:


``` csharp
public static HtmlString RouteValueChange(this UrlHelper url, object routeValues)
{
    // Convert new route values to a dictionary
    var newRoute = new RouteValueDictionary(routeValues);

    // Get the route data of the current Url
    var current = url.RequestContext.RouteData.Values;

    // Merge the new values INTO the current values, overwriting any existing values/querystrings
    foreach (var item in newRoute)
    	current[item.Key] = item.Value;

    // Generate the new Url
    var newUrl = url.RouteUrl(current);
    return new HtmlString(newUrl);
}
```

_Note:_ Passing an object with an  `action` or `controller` value will change the action/controller.

Creating an `ActionLink` from the URL helper is left as an exercise for the reader.
