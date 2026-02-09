![Calculator UI](./Calculator-UI.png)

## 🧠 The Logic & Architecture

The core challenge of this project was managing the calculator's state—specifically, distinguishing between entering a new number and operating on a previous result. To solve this, I designed a state machine based on a "Two Worlds" concept.

### The Meta Rule
> **"Only the first action after `=` matters."**

The state of the calculator is defined entirely by what the user does immediately after a calculation is completed.

### World 1: Initialization (Before 1st Operation)
This is the default state. The calculator accepts input into a buffer ("Editing Mode").
1. **Input:** User types numbers into the edit buffer.
2. **Locking:** Clicking an operator "finalizes" the first number and moves the calculator into a waiting state for the second operand.
3. **Calculation:** Clicking `=` finalizes the second number, computes the result, and transitions the system to **World 2**.

### World 2: Chaining (After 1st Operation)
Once a result is displayed, the calculator waits for the "First Action" to determine the path forward:

* **Path A: Continue Calculation** (User clicks an Operator)
    * The current result is treated as the *new* first operand.
    * The system immediately locks this number and waits for a new second operand.
* **Path B: Restart** (User clicks a Number)
    * The system interprets this as a desire to start fresh.
    * The result is discarded, the screen clears, and the user is returned to **World 1**.

### 🔄 Editing Mode vs. Finalizing Mode
The logic constantly switches between:
* **Editing Mode:** The user is actively constructing a number (typing digits).
* **Finalizing Mode:** A number has been locked in by an operator or equal sign.

**Special Exceptions:**
The keys `DEL`, `%`, `+/-`, and `.` act as "bridge" keys. If pressed while in World 2 (displaying a result), they force the system back into **Editing Mode**, allowing the user to modify the previous result before using it in a new calculation.

## Features
* **Standard Operations:** Add, Subtract, Multiply, Divide.
* **Sign Toggling:** Swap between positive and negative values (`+/-`).
* **Percentage:** Converts current value to a percentage.
* **Backspacing:** `DEL` button to remove the last digit entered.
* **Precision Handling:** Outputs are formatted to avoid floating-point overflow on the display.s

## Self-reflection:
👉 [LESSON.md](./LESSON.md)
