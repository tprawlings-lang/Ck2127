/**
 * Site photography. Current files are launch-vehicle versions cropped from
 * the 21-shot photo kit contact sheet (~300px wide — see PHOTO_KIT.md).
 * To upgrade: drop the full-resolution, caption-free file over the same path
 * in public/images/. Nothing else needs to change.
 */
export const siteImages = {
  heroBanner: {
    src: '/images/01-hero.png',
    alt: 'Connor Kearns standing with arms crossed in a training gym',
  },
  aboutPortrait: {
    src: '/images/02-headshot.png',
    alt: 'Professional headshot of Connor Kearns',
  },
  meetConnor: {
    src: '/images/03-smiling-headshot.png',
    alt: 'Connor Kearns, Phoenix personal trainer',
  },
  exerciseDemo: {
    src: '/images/08-exercise-demo.png',
    alt: 'Connor demonstrating proper form on a supported dumbbell row',
  },
  groceryShopping: {
    src: '/images/12-grocery-shopping.png',
    alt: 'Connor selecting fresh produce at a grocery store',
  },
  mealPrep: {
    src: '/images/13-meal-prep.png',
    alt: 'Connor portioning healthy meals into meal-prep containers',
  },
  cookingInstruction: {
    src: '/images/14-cooking-instruction.png',
    alt: 'Connor teaching a hands-on cooking lesson in a home kitchen',
  },
} as const;

export type SiteImageSlot = keyof typeof siteImages;
