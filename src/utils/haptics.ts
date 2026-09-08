/**
 * Tactile & Vibration Haptic Feedback Engine for LiveVolume
 * Provides rich sensory feedback for 3D holographic calling interactions
 */

export type HapticType = 
  | 'callStart'    // Dual energetic pulse for establishing 3D holographic stream
  | 'callEnd'      // Sharp triple-burst disconnect pattern
  | 'light'        // Subtle UI tap
  | 'medium'       // Standard button action
  | 'heavy'        // Critical toggle or modal action
  | 'favoritePin'  // Joyful two-step chime pulse for pinning/unpinning
  | 'modeSwitch'   // Spatial 2D/3D shift click
  | 'success';     // Positive confirmation pulse

export const triggerHaptic = (type: HapticType = 'light') => {
  if (typeof window === 'undefined') return;

  // Browser vibration API support check
  if ('navigator' in window && typeof navigator.vibrate === 'function') {
    try {
      switch (type) {
        case 'callStart':
          // Tactile sequence: ramp up to spatial link
          navigator.vibrate([40, 50, 70, 40, 100]);
          break;

        case 'callEnd':
          // Decisive sharp shutdown sequence
          navigator.vibrate([80, 50, 60]);
          break;

        case 'favoritePin':
          // Light double-tap for pinning
          navigator.vibrate([25, 40, 35]);
          break;

        case 'modeSwitch':
          // Dimensional transition pulse
          navigator.vibrate([30, 30, 40]);
          break;

        case 'heavy':
          navigator.vibrate(60);
          break;

        case 'medium':
          navigator.vibrate(35);
          break;

        case 'light':
        default:
          navigator.vibrate(18);
          break;
      }
    } catch {
      // Ignore if navigator.vibrate is restricted by browser policy
    }
  }

  // Dispatch a custom event so UI can display micro tactile ripple feedback (helpful in web previews)
  window.dispatchEvent(
    new CustomEvent('livevolume-haptic', {
      detail: { type, timestamp: Date.now() },
    })
  );
};
