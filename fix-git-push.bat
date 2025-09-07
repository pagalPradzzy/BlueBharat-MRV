@echo off
echo ========================================
echo BlueBharat MRV - Git Push Fix Script
echo ========================================
echo.

echo Step 1: Pulling existing content from remote...
git pull origin main --allow-unrelated-histories

echo.
echo Step 2: Adding all files to staging...
git add .

echo.
echo Step 3: Creating commit with your changes...
git commit -m "Add fieldworker mobile app to BlueBharat MRV ecosystem

- React Native/Expo mobile app for field data collection
- GPS location capture and photo documentation
- Offline data storage with AsyncStorage
- Cross-platform support (iOS, Android, Web)
- Integration with existing MRV dashboard system
- Role-based authentication for field workers
- Complete ecosystem for blue carbon monitoring"

echo.
echo Step 4: Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo Push completed successfully!
echo ========================================
echo.
echo Your code is now available at:
echo https://github.com/prayasPradzzy/BlueBharat-MRV
echo.
pause
