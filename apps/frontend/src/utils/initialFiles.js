export const initialFiles = [
  {
    id: 1,
    name: "main.js",
    language: "javascript",
    content: `console.log("Hello JavaScript");`,
  },

  {
    id: 2,
    name: "main.py",
    language: "python",
    content: `print("Hello Python")`,
  },

  {
    id: 3,
    name: "main.c",
    language: "c",
    content: `#include <stdio.h>

int main() {
    printf("Hello C");
    return 0;
}`,
  },

  {
    id: 4,
    name: "main.cpp",
    language: "cpp",
    content: `#include <iostream>

using namespace std;

int main() {
    cout << "Hello C++";
    return 0;
}`,
  },

  {
    id: 5,
    name: "Main.java",
    language: "java",
    content: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}`,
  },

  {
    id: 6,
    name: "main.go",
    language: "go",
    content: `package main

import "fmt"

func main() {
    fmt.Println("Hello Go")
}`,
  },
];