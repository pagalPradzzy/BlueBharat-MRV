@echo off
echo ========================================
echo BlueBharat MRV - Git Push Script
echo ========================================
echo.

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding remote repository...
git remote add origin https://github.com/prayasPradzzy/BlueBharat-MRV.git

echo.
echo Step 3: Adding all files to staging...
git add .

echo.
echo Step 4: Creating initial commit...
git commit -m "Add fieldworker mobile app to BlueBharat MRV ecosystem

- React Native/Expo mobile app for field data collection
- GPS location capture and photo documentation
- Offline data storage with AsyncStorage
- Cross-platform support (iOS, Android, Web)
- Integration with existing MRV dashboard system
- Role-based authentication for field workers
- Complete ecosystem for blue carbon monitoring"

echo.
echo Step 5: Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo Push completed successfully!
echo ========================================
echo.
echo Your code is now available at:
echo https://github.com/prayasPradzzy/BlueBharat-MRV
echo.
pause
