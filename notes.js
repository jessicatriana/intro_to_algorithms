// Sweeping Method - Linear and slower than Binary
// Answers the question: Where does this element appear in the list?
// Big O Notation = O(n) - If the array has a length of n elements, the runtime is proportional to n
// Example: array = [1,2,3,4] = O(4)
// O(2n) = If the lookup has to run through the dataset twice, it is O(2n) but the 2 is not typically written

// Binary Search (Splitter - Only works on sorted lists)
// O(log n)
// Uses a logarithmic approach to start the search from roughyl the middle of the list and decide which half
// to search next. From there, it starts from the middle again. For 60 elements, this takes about 3 searches
// which is way faster than the linear search