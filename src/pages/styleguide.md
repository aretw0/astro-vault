---
layout: ../layouts/BaseLayout.astro
title: Style Guide (Kitchen Sink)
---

## Style Guide (Kitchen Sink)

This is the Style Guide note used for visual regression testing.

It links to [[linked-note]].
It tries to link to a non existing note [[non-existing-note]].
It tries to link to a ignored note [[_ignored-note]].

And shows an image (automatic alt):
![[test_image.png]]

And shows an image with explicit alt text (pipe syntax):
![[test_image.png|A beautiful test image showing layout capabilities]]

And tries to show an image that doesn't exist:
![[non-existing-image.png]]

And tries to show a ignored image:
![[_test_image_to_ignore.png]]

## Callouts

> [!note]
> This is a basic note callout.

> [!tip] Quick win
> You can add a custom title after the callout type.

> [!warning]
> This callout highlights a potential problem.

> [!danger]
> This callout marks a critical issue.

### Custom Types (Fallback Test)

> [!success]
> This callout uses a custom type not defined in config. It falls back to accent color.

> [!question] Why does this matter?
> Custom types work seamlessly without breaking the site.
