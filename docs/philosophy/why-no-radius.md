# Why We Forbid Border-Radius

In Kairos, `border-radius: 0` is enforced globally without exception. Linter pipelines will block any PR attempting to round a corner.

## Why?
1. **The Domain Context:** Kairos is designed for broadcast control surfaces (video switchers, routing matrices, audio consoles). Physical hardware panels do not have rounded, friendly UI buttons. They have sharp, grid-aligned, high-density industrial switches. 
2. **High-Density Data:** In multiviewers or dense audio patchbays, every pixel matters. Rounded corners create negative space gaps between adjacent elements that waste pixels and break strict grid layouts.
3. **Aesthetic Honesty:** The system aims for "cool steel" industrial vibes, not a playful consumer app. Sharp corners signal precision and professionalism to broadcast operators.
