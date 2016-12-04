---
layout: post
title: "What does it mean to 'mine' Bitcoins?"
tags: bitcoin
---

Bitcoins are in vogue. Distributed ledgers, fiat currency, and the dramatic impact cryptocurrencies will have on financial systems are topics of discussion on trains, in board meetings, and at the dinner table. As of writing, the exchange rate is <code>1 BTC = 679.99 USD</code>.

However, most people only have a high-level understanding of how Bitcoins work. Most are dumbfounded at how menial the act of "mining" is. Of the Bitcoin explanations I've seen, mining is usually explained as solving a problem that has multiple answers, but you can only solve it by [brute force](https://en.wikipedia.org/wiki/Brute-force_search) (i.e. there's no clever and quick way to solve it). You successfully "mine" a Bitcoin when you find an answer to this problem then continue looking for other answers. So what is this "problem" and why can't I solve it using my TI-83?

To understand the Bitcoin mining problem, we're going to create our own "problem" using more familiar terminology. We'll then draw an analog to the actual problem at the heart of Bitcoin. For mathematically inclined, I'm intentionally glossing over some details to make the analogy less complex.

# Donuts

We start in a donut (or doughnut) shop. The shop owner has decided to halt all business operations and focus on creating a puzzle for anyone to solve. If you solve this puzzle, the owner will give you a [donut hole](https://en.wikipedia.org/wiki/Doughnut#Holes). Before we can solve the puzzle, we need to understand the individual pieces we can use to solve it:

1. **Donut Basket**: these are all the types of donuts the shop makes. They make precisely 6 types of donuts:
    - Sprinkles
    - Plain
    - Jelly
    - Chocolate
    - French Cruller
    - Old Fashioned

   You'll use them for the Donut Manipulator Machine.

2. **Donut Manipulator Machine**: this is a special machine with a conveyor belt that you place donuts on. The belt runs through the machine and donuts come out on the other side. This machine has some interesting properties:
    - No matter how many donuts you put into the machine, you always get 5 donuts out of it. So whether I put in 1 French Cruller or 8 French Crullers, I'll get 5 other donuts out.
    - If you put the same number, order, and types of donuts into the machine, you'll always get the same result.

      So if I put in: Jelly, Plain, Old Fashioned
      
      I'll get out: Chocolate, Plain, Chocolate, Sprinkles, Plain

      If I put those same donuts in again, I'll get the same ones out. For a specific input, you'll always get the same output, it never changes.
    - If you change the order of the donuts you put in, it will dramatically change the result that comes out of the machine.
    - The machine will always take 5 minutes for any run, no matter how many donuts you put into it.

The Donut Manipulator Machine (DMM) is a critical piece of the puzzle. Take the time to review its properties as they're key to solving this puzzle.

To get a sense of how it works, play around with the DMM in the Donut Shop demo:

<a class="dmm-link" href="/donut-shop">Launch the Donut Shop demo</a>

# The Puzzle

Now that we understand what the pieces of the puzzle are, the shop owner wants us to answer the following question:

> What do I have to put into the DMM to get out a Sprinkles donut as the first donut?

To elaborate on what the puzzle is, the owner wants to know what quantity of donuts, in what order, and of what type you have to put in so the DMM spits out a donut order matching:

1. Sprinkles
2. Any Type of Donut
3. Any Type of Donut
4. Any Type of Donut
5. Any Type of Donut

So how do we solve this puzzle?

All we can do is guess because the DMM is special and no one knows how it determines which donuts to put out. So we go over to the Donut Basket, grab an Old Fashioned, French Cruller, Chocolate, then head over to the DMM. We put our selection of donuts in the same order we got them, then wait for it to do its magic. After 5 minutes, the DMM gives us:

1. Plain
2. Sprinkles
3. Old Fashioned
4. Jelly
5. Jelly

So close! We got a Sprinkles as the 2nd donut but the shop owner only wants Sprinkles in the first position. We desperately want that donut hole so we decide to lie to the owner telling him that we figured it out. Besides, what does he know, he turned his donut shop into a puzzle solving place. We tell him that if he puts an Old Fashioned, French Cruller, Chocolate into the DMM, a Sprinkles will come out as the first donut. We believe we've outsmarted him and the donut hole is as good as ours!

Well, because the Donut Basket and DMM is usable by anyone, the shop owner walks right over to the Donut Basket, grabs the donuts we told him about, puts them into the DMM, waits 5 minutes and gets the following donuts:

1. Plain
2. Sprinkles
3. Old Fashioned
4. Jelly
5. Jelly

It's the same order of donuts we got with the Sprinkles as the 2nd donut. Our plan has been foiled. Because the machine always gives the same result as what you put in it, the shop owner easily confirmed whether or not we solved the puzzle. The donut hole is still up for grabs.

So what do we do now? Well, all we can do is continue trying different combinations of donuts. We do the same thing:

1. Head over to the donut basket and pick out some donuts.
2. Put those donuts into the DMM.
3. Wait five minutes.
4. Look to see if the 1st donut the DMM gave out is a Sprinkles.
5. Repeat.

After our 15th failed attempt, we try the following combination of donuts:

1. Old Fashioned
2. Old Fashioned
3. French Cruller
4. French Cruller

To our surprise, the DMM gives us:

1. Sprinkles
2. French Cruller
3. French Cruller
4. Old Fashioned
5. Sprinkles

We got a Sprinkles as the 1st donut! We rush to the owner, tell him to put in Old Fashioned, Old Fashioned, French Cruller, French Cruller, to get a Sprinkles as the first donut. The shop owner does exactly as we did with the DMM and confirms that we've solved the puzzle. He writes down our findings in his ledger and assigns us the award.

We got a donut hole! But wait, there's more! There could be other combinations of donuts we can put into the DMM to get a Sprinkles as the first donut. So we roll up our sleeves and:

1. Head over to the donut basket and pick out some donuts.
2. Put those donuts into the DMM.
3. Wait five minutes.
4. Look to see if the 1st donut the DMM gave out is a Sprinkles.
5. Repeat.

After our 73rd failed attempt, we try the following combination of donuts:

1. Jelly
2. Old Fashioned
3. Chocolate
4. Jelly
5. Sprinkles

To our surprise, the DMM gives us:

1. Sprinkles
2. Old Fashioned
3. Plain
4. Plain
5. Old Fashioned

We got a Sprinkles as our 1st donut again! We tell the shop owner and after he confirms, he adds it to his ledger and gives us another donut hole.

But we're not satisfied, we want more! What if we spent time understanding how the DMM works so we could determine all the possible inputs that give you a Sprinkles as the first donut?

# Inside the DMM

The way the DMM behaves hinges on clever logic that makes it nearly impossible to determine the input if you only know the output. The logic leverages many mathematical tools and techniques which are outside the scope of this article. The DMM is a form of a [hash function](https://en.wikipedia.org/wiki/Hash_function), which Wikipedia describes as

>  a function that can be used to map data of arbitrary size to data of fixed size.

Cryptography experts have created multiple hash functions which are nearly impossible to reverse. However, as computing power increases, brute force solutions have become more feasible. For that reason, newer hashing functions intentionally take longer to compute (think of how the DMM takes 5 minutes to generate the output). The increased compute time of the function in turn increases the time it takes to reach a solution through brute force.   

# The Big Reveal

The pieces of the puzzle and the process of solving it outlined above have a direct counterpart in the Bitcoin world:

1. The Donut Manipulator Machine (5 output) is the SHA-256 hashing algorithm (256 output).
2. The Donut Basket with donuts to put into the DMM is the infinite numbers at our disposal to put through the SHA-256 algorithm.
3. The puzzle of determining what input makes the DMM output a Sprinkles as the first donut is determining what input makes the SHA-256 algorithm output a 0 as the first output.
4. The Donut Hole is a Bitcoin.

In our donut shop world, "mining" was the process we went through as we selected our donuts from the donut basket, put them into the DMM, then waited for the result. It was not a clever solution, it was [brute force](https://en.wikipedia.org/wiki/Brute-force_search). In the Bitcoin world, "mining" is running a computer program that selects some numbers, puts them through the hashing algorithm, then waits for the result. Those mining Bitcoins hope one of the results yields a Bitcoin.

# Down the Donut Hole

If you've gotten this far, these questions probably started flooding your mind:

1. Can more than one person try to solve the "problem"?
2. Could other donut shop owners start their own puzzle and have people solve it?
3. How do we make sure the donut shop owner doesn't cheat and give other people the donut holes?

The underpinning of these questions is _scale_ and _trust_. How do we expand the system but ensure it's not exploited and participants are not cheated? The answers to these questions lie in Bitcoin's distributed ledger, a critical piece of the Bitcoin system. Describing and explaining the distributed ledger is left for another time.

_Thank you to [Lamia Pardo](https://twitter.com/lamiapf) and [Joshua Gordon-Blake](https://twitter.com/JGB214) for reading drafts of this post._
