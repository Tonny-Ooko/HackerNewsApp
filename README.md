# 📰 Hacker News Client
A high-performance **React Native CLI** application built with **TypeScript** and **Zustand**. This project demonstrates clean architectural patterns, robust state persistence, and comprehensive unit testing.

---

## 🏛 Architecture & Design Decisions
* **Feature-Based Structure**: The codebase is modularized by domain (e.g., news, bookmarks) rather than technical types. This ensures better scalability and separation of concerns.
* **Zustand State Management**: Chosen for its minimal boilerplate and atomic updates. It handles persistence via `AsyncStorage` effortlessly.
* **Logic Decoupling**: Business logic, such as `sortArticles`, is extracted into pure utility functions, making it independently testable.

---

## 💡 Section 02: Technical Questions

### Q1 — Bridge vs JSI & The New Architecture
The legacy Bridge relies on asynchronous JSON serialization, creating a bottleneck. **JSI (JavaScript Interface)** replaces this by allowing the JS engine to hold a direct reference to C++ host objects, enabling synchronous method calls. This removes serialization overhead and solves "jumpy" UI issues in high-frequency events like scrolling.

### Q2 — Diagnosing a Janky FlatList
1. **Profiling**: Use React DevTools and the native Perf Monitor to track JS/UI thread FPS.
2. **Fixes**: 
   - Implement `getItemLayout` for predictable item heights.
   - Use unique `keyExtractor` IDs (not indexes).
   - Memoize render items and avoid anonymous functions in `renderItem`.
   - Adjust `windowSize` and `maxToRenderPerBatch` for memory efficiency.

### Q3 — useCallback and useMemo
**Benefit**: `useMemo` avoids re-sorting large datasets (like 200+ stories) during unrelated state changes. `useCallback` prevents child component re-renders by stabilizing function references.
**Trade-off**: Wrapping simple logic adds "memoization overhead"—memory allocation and dependency comparisons can cost more than the re-calculation itself.

### Q4 — State Management Decision: Zustand
Zustand scales better than Context API (which causes unnecessary consumer re-renders) and has less friction than Redux Toolkit. I would only switch to Redux if the project required complex Sagas or strict architectural guardrails for a very large team.

### Q5 — Offline-First UX Strategy
I use a multi-layered approach: `@react-native-community/netinfo` for detection and `AsyncStorage` for persistence. We serve "stale" data from the cache while showing an offline banner. The trade-off is "cache consistency," but for news, immediate access is prioritized over real-time comment counts.

---

## 🧪 Testing & Performance
* **Unit Tests**: Coverage for sorting logic and state transitions.
* **Optimization**: Leveraged `Promise.all` for parallel metadata fetching.
* **Command**: `npm test`

---

## 🛠 Setup & Installation

### Step 1: Install & Start Metro
```sh
npm install
npx react-native start
Step 2: Build and Run
Android:

Bash

npx react-native run-android
iOS:

Bash

cd ios && pod install && cd ..
npx react-native run-ios
⚖️ Trade-offs & Roadmap
N+1 API Problem: The HN API requires separate calls per item. A production fix would involve a GraphQL gateway.

Manual State vs. React Query: Used useEffect for the MVP; future iterations would use TanStack Query for advanced caching/retries.


### **How to update your GitHub now:**
Once you save this file, run these commands to push the final professional version:

```bash
git add README.md
git commit -m "docs: upgrade README with architecture decisions and technical answers"
git push origin main

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
