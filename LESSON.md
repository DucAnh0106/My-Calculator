#  Reflection — Calculator Project

The real challenge was understanding **user intent** and managing **state transitions**.

## Key Lessons Learned

### 1. Buttons are not intent
At first, I reacted directly to button clicks.
This quickly broke down when users:
- spammed operators
- pressed `DEL` after `=`
- chained calculations
- edited results

The fix was to stop thinking in *events* and start thinking in *intent*.

---

### 2. Editing ≠ Finalized values
Separating:
- **editBuffer** (what the user is typing)
- **stored operands** (numbers locked by an operator or `=`)

was the single most important architectural decision.

This separation made features like `DEL`, `%`, and `+/-` predictable instead of fragile.

---

### 3. “After `=` is a special world”
Most bugs came from ignoring what happens *after* a calculation.

The key rule became:
> **Only the first action after `=` matters**

That insight simplified:
- chaining
- restarting
- editing results

---

### 4. Edge cases reveal design flaws
Operator spam, repeated `=`, deleting results — these weren’t “annoying bugs”.
They were **signals** that my state model was incomplete.

Fixing them required redesigning logic, not adding conditions.

---

