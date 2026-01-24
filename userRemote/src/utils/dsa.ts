export const nonRepeatLongestString = (s: string): number => {
    const map = new Map();
    let L = 0;
    let result = 0;
    for (let r = 0; r < s.length; r++) {
        if(map.has(s[r])) {
            L = Math.max(L, map.get(s[r]) + 1)
        }
        map.set(s[r], r)
        result = Math.max(result, r - L + 1)
        console.log(L, result)
    }

    return result;
}

//Find Maximum Sum Subarray of Size K
export function maxSumSubarray(arr: number[], k: number) {
    let windowSum = 0;
    let maxSum = 0;

    for(let i=0; i < arr.length; i++) {
        windowSum += arr[i];

        if(i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum)
            windowSum -= arr[i - (k - 1)]
        }
    }

    return  maxSum
    //Time: O(n)
    //Space: O(1) (no extra data structures)
}

export function firstNonRepeatingChar(s: string): string | undefined {
    const freq = new Map();
    for(let i=0; i < s.length; i++) {
        freq.set(s[i], (freq.get(s[i]) | 0) + 1)
    }

     for(let i=0; i < s.length; i++) {
        if(freq.get(s[i]) === 1) {
            return s[i];
        }
    }
}

export function groupAnagrams(strs: string[]) {
        const map = new Map<string, string[]>();
        for(let word of strs) {
            const key = word.split("").sort().join("");
            if(!map.has(key)) {
                map.set(key, [])
            }
            map.get(key)!.push(word)
        }
        return Array.from(map.values());
}

type code = "{}[]()";

export function isValidParentheses(s: string) {
    const stack = [];
    const map: any = {
        "}":"{",
        ")":"(",
        "]":"["
    }

    for(let char of s) {
        if(char == "{" || char == "(" || char == "[") {
            stack.push(char)
        } else {
            if(stack.length === 0) return false;
            const top = stack.pop();

            if(top !== map[char]) return false
        }
       
    }
    return stack.length === 0
}