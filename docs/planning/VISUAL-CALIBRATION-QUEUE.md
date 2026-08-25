# VISUAL CALIBRATION QUEUE
**Target: Kairos 1.0 Stable**

This is the definitive visual calibration queue. It includes ONLY components that are correctly implemented, not duplicated, not deprecated, not domain-specific, placed in the correct architectural layer, contract-compliant, and visually calibratable.

*(Note: Components with architectural violations, hidden abstractions, or duplications—such as Checkbox, Radio, Switch, Modal, Dropdown, Tooltip, Divider, and Tag—have been intentionally excluded from this queue until their architectural purity is restored according to the Gap Analysis).*

| Priority | Component | Layer | Depends On | Visual Status | Ready |
|----------|-----------|-------|------------|---------------|-------|
| 1 | Color Token | L0 Foundation | None | NOT REVIEWED | YES |
| 2 | Spacing Token | L0 Foundation | None | NOT REVIEWED | YES |
| 3 | Typography Token | L0 Foundation | None | NOT REVIEWED | YES |
| 4 | Border Radius Token | L0 Foundation | None | NOT REVIEWED | YES |
| 5 | Shadow Token | L0 Foundation | None | NOT REVIEWED | YES |
| 6 | Elevation Token | L0 Foundation | Shadow Token | NOT REVIEWED | YES |
| 7 | Motion Token | L0 Foundation | None | NOT REVIEWED | YES |
| 8 | Heading | L3 Content | Typography, Color | NOT REVIEWED | YES |
| 9 | Paragraph | L3 Content | Typography, Color | NOT REVIEWED | YES |
| 10 | Code | L3 Content | Typography, Color, Spacing | NOT REVIEWED | YES |
| 11 | Kbd | L3 Content | Typography, Color, Spacing | NOT REVIEWED | YES |
| 12 | Icon | L3 Content | Size, Color | NOT REVIEWED | YES |
| 13 | Image | L3 Content | Box | NOT REVIEWED | YES |
| 14 | Avatar | L3 Content | Image, Size | NOT REVIEWED | YES |
| 15 | Button | L4 Input | Typography, Spacing, Color | NOT REVIEWED | YES |
| 16 | Range Slider | L4 Input | Box, Color, Spacing | NOT REVIEWED | YES |
| 17 | Badge | L5 Feedback | Typography, Color, Spacing | NOT REVIEWED | YES |
| 18 | Spinner | L5 Feedback | Color, Motion | NOT REVIEWED | YES |
| 19 | Progress Bar | L5 Feedback | Box, Color, Motion | NOT REVIEWED | YES |
| 20 | Empty State | L5 Feedback | Box, Typography, Icon | NOT REVIEWED | YES |
| 21 | Backdrop | L6 Overlay | Color, Z-Index, Motion | NOT REVIEWED | YES |
| 22 | Command Palette | L6 Overlay | Box, Typography, Input | NOT REVIEWED | YES |
| 23 | Popover | L6 Overlay | Box, Shadow, Z-Index | NOT REVIEWED | YES |
| 24 | Link | L7 Navigation | Typography, Color | NOT REVIEWED | YES |
| 25 | Breadcrumb | L7 Navigation | Link, Spacing | NOT REVIEWED | YES |
| 26 | Tabs | L7 Navigation | Box, Typography, Color | NOT REVIEWED | YES |
| 27 | Pagination | L7 Navigation | Button, Typography | NOT REVIEWED | YES |
| 28 | Accordion | L8 Composite | Box, Typography, Motion | NOT REVIEWED | YES |
| 29 | Carousel | L8 Composite | Box, Button, Motion | NOT REVIEWED | YES |
| 30 | Progress Stepper | L8 Composite | Box, Typography, Badge | NOT REVIEWED | YES |
| 31 | Tree | L8 Composite | Box, Typography, Icon | NOT REVIEWED | YES |
| 32 | Table | L9 Data Display | Box, Typography, Border | NOT REVIEWED | YES |
