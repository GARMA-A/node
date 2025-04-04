## example one
```javascript
function Print2DArray(arr, n) // n*n + 1 space 
  for(i=0; i<n; i++) // (n+1) time 
    for(j=0; j<n; j++) // n *(n+1) time
       print(arr[i,j]); // n*n time
// total time complexity = O(n^2)
// total space complexity = O(n^2)
```
## example two

```javascript
Algorithm add(A,B,n){ // time O(n*n + 1) //space O(n*n +1)
     for (i=0;i<n;i++){ // O(n+1)
        for(j=0; j<n;j++){ // n*n
            C[i,j]=A[i,j] + B[i,j]; // n*n
        }
     }
}
//totla space complexity = O(n*n)
// total time complexity = O(n*n)

```

## example three
```javascript
Algorithm Multiply(A,B,n){//space n+n+1 // time 1
for (i=0;i<n;i++){ //space 1 // time n+1 
      for(j=0; j<n;j++){ // space 1 // time n*(n+1)
         C[i,j]=0; //time n*n 
  for(k=0;k<n;k++){// space 1 // time n+1
    C[i,j]=C[i,j] + A[i,k] * B[k,j]; // time n*n*n
  }
}
// total time complexity = O(n*n*n)
// total space complexity = O(n*n)
}
```
## example four
```javascript
i=1, sum=0; // space 1+1 time 1+1 
while(i ≤ n) // space 1 time n+1
{
  sum=sum+i; // n 
   i++;  // n
}
// total time complexity O(n)
// total space complexity O(n)
```

```javascript
i=1, k=1; // space 1+1 time 1+1
while(k < n) // space 1 time n+1
    k=k+i; // n
    i++; // n
}
// total time complexity O(n)
// total space complexity O(n)

```

```javascript
```



```javascript
```
