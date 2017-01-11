---
layout: post
title: "The Types of Engineers"
tags: engineering
---
A plethora of books, articles, and research papers have been written about software engineering quality measurement. Over the course of the last half-century, different methods of measurement have been developed, adopted, abused, and discarded for newer methods that aim to solve the problems of the previous methods.

Whether you measure bug count, velocity, [lines of code](http://www.folklore.org/StoryView.py?story=Negative_2000_Lines_Of_Code.txt), or a combination, there’s no consensus on the most effective method of assessing the quality of work of a software engineer. This is in part due to the fact that engineers are a type of [knowledge worker](https://en.wikipedia.org/wiki/Knowledge_worker) where their primary job is to think, and, as [Joel Spolsky outlines](https://www.joelonsoftware.com/2002/07/15/20020715/), measuring knowledge workers can lead to perverse incentives:

> It seems like any time you try to measure the performance of knowledge workers, things rapidly disintegrate, and you get what [Robert D. Austin](http://www.cutter.com/consultants/austinr.html) calls measurement dysfunction. His book [Measuring and Managing Performance in Organizations](http://www.amazon.com/exec/obidos/ASIN/0932633366/ref=nosim/joelonsoftware) is an excellent and thorough survey of the subject. Managers like to implement measurement systems, and they like to tie compensation to performance based on these measurement systems. But in the absence of 100% supervision, workers have an incentive to “work to the measurement,” concerning themselves solely with the measurement and not with the actual value or quality of their work.
>
> Software organizations tend to reward programmers who (a) write lots of code and (b) fix lots of bugs. The best way to get ahead in an organization like this is to check in lots of buggy code and fix it all, rather than taking the extra time to get it right in the first place. When you try to fix this problem by penalizing programmers for creating bugs, you create a perverse incentive for them to hide their bugs or not tell the testers about new code they wrote in hopes that fewer bugs will be found. You can’t win.

However, what remains true is that bad engineering and good engineering is perceptible to other engineers. Generally, engineers can assess the abilities of other engineers by looking at _how_ they solved certain problems. With enough data, one can begin to characterize an engineer as one of three types:

- The **Under-Engineer** exhibits shallow thinking by solving problems using solutions that are low in extensibility, readability, and performance. Often these solutions don’t cover all the possible use cases and require refactoring by other engineers as they work on features that leverage under-engineered code. Generally, junior engineers are characterized as under-engineers due to lack of experience.

- The **Over-Engineer** is someone that has recently learned and understood how to use a new technique or technology. They attempt to solve all possible and impossible scenarios by providing an excessive amount of extensibility fraught with multiple levels of misdirection and abstraction. They’re usually technologically religious and will take any opportunity to tell you why a specific method or product will solve all of the team’s problems. Mid-level engineers who recently discovered [software design patterns](https://en.wikipedia.org/wiki/Software_design_pattern) tend to fall into this category.

- The **Engineer** is an abstract thinker that can look beyond the syntax and tools by focusing on the solution. This type of engineer is desensitized to allure of the Next Best Thing because they’ve seen the ebb and flow of technology. This type of engineer understands that their primary responsibility is to understand the problem, its constraints, and come up with a solution. These types of engineers are considered senior engineers and are difficult to find and retain.

What determines the type of engineer you are depends on the consistency of the solutions you create, that is, under-engineers create under-engineered solutions most of the time while over-engineers create over-engineered solutions most of the time. However, an over-engineer can sometimes perform like an under-engineer or an engineer. Underperformance and overperformance could be influenced by a number of factors including work environment, context, intellectual horsepower, and even personal life. The progression from one type of engineer to another is accomplished through learning from peers, textbooks, or trial and error. 

Like most things, engineering is a team sport. It’s up to the individual team members to help each other identify under-engineered and over-engineered solutions to ensure the best possible work product for the whole team. Code reviews and pair programming are effective practices where team members and managers can assess each other’s work to understand where help is needed. Through this lense, teams can identify poor solutions before they’re shipped to the customer while ensuring technical debt is tightly managed.

It's difficult to map the types of engineers to an easily quantifiable measurement of effectiveness that can be leveraged for assessing talent. However, if there exists a chain of trust that begins at the most senior level of the organization and extends to all managers within it, qualitative discussions on individual and team results can be used to properly assess engineering talent. This is not to say that velocity or bug count are not valuable, rather, they can’t be the primary means to determine quality or ability. 


_Discuss on [Hacker News](https://news.ycombinator.com/item?id=13374530)_
