### Tips for using memo()

## use it as high up in the component tree as possible

-   Blocking component execution there will aslso block in all teh child components

## checking props with memo costs peformance

-   don't wrap around all the components

## don't use it around componetns where props will change frequently
