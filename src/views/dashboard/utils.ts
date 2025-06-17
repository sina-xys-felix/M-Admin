export function getTimePeriod() {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 6) {
    return 'dashboard.welcome.night' // 0
  } else if (hour >= 6 && hour < 12) {
    return 'dashboard.welcome.timePeriod' // 1
  } else if (hour >= 12 && hour < 18) {
    return 'dashboard.welcome.afternoon' // 2
  } else {
    return 'dashboard.welcome.evening' // 3
  }
}
