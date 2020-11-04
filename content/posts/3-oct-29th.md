---
title: October 29th
description: Majority of a days worth of Blog
date: 2020-10-29
---

For this blog post I figured I would try and blog my whole day. So lets get into it.

Woke up this morning at 6:00am, last night I had a few hours of clear skies to shoot some astro shots so I had my stacked image ready to rock when I woke up.

Between 6:30am and 7:30am I worked and edited on my astro picture of the [California Nebula](https://en.wikipedia.org/wiki/California_Nebula), it's not exactly where I want it to be, but it's an improvement on my attempt before so I'm fine with it. You can view the image [here](https://www.flickr.com/photos/joegallegosphotography/50543135728/in/dateposted/).

Its now about 7:37am and I'm obviously working on this blog post for one, and trying to plan out what I want to tackle next on either the Worth Going Outside site, or my personal site.

**8:30am**

Decided to make sure everything was working correctly still on the Worth Going outside site, and to my none surprise, something was broken. It seems something was broken with my Date component when trying to pull the current date and time from the API. Simple solution, rename the component to `ConvertDate` and have it only show the time (hh:mm a) and use vanilla js to pull in the current time. I realize that having the current date in the heading was not needed so just showing the time you submitted the request to the api would be sufficient. Crisis averted.

**9AM**

Random youtube video showed up about [fizzBuzz](https://en.wikipedia.org/wiki/Fizz_buzz). I realize I’ve never tried to do the fizz buzz coding challenge before so I made a quick attempt at it. Don’t know if its the best out there, but it works and I’m happy about that.

```jsx
for (let i = 1; i < 100; i++) {
  if (i % 3 == 0 && i % 5 == 0) {
    console.log('fizzBuzz');
  } else if (i % 3 == 0) {
    console.log('fizz');
  } else if (i % 5 == 0) {
    console.log('buzz');
  } else {
    console.log(i);
  }
}
```

**4:50pm**

I decided to work some more on my personal site this afternoon. I ended up getting everything moved over to Next.js and converting the majority over to Tailwind CSS and Chakra UI, but there is still more to do on it. I have made some good progress I believe and deployed the latest changes.

Still have to figure out why this blog doesn't recognize markdown like normal, but that will be for another day.
