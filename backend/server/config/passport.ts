import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../db/schemas';
import { v4 as uuidv4 } from 'uuid';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// Configure Google OAuth Strategy (only if credentials are set)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: `${backendUrl}/api/user/auth/google/callback`,
                scope: ['profile', 'email']
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails?.[0]?.value;
                    const firstName = profile.name?.givenName || '';
                    const lastName = profile.name?.familyName || '';
                    const profileImage = profile.photos?.[0]?.value;
                    const googleId = profile.id;

                    if (!email) {
                        return done(new Error('No email found in Google profile'), undefined);
                    }

                    let user = await User.findOne({ email: email.toLowerCase() });

                    if (user) {
                        if (!user.googleId) {
                            user.googleId = googleId;
                            user.profileImage = profileImage || user.profileImage;
                            await user.save();
                        }
                        user.lastLogin = new Date();
                        await user.save();
                    } else {
                        const userId = uuidv4();
                        user = new User({
                            id: userId,
                            email: email.toLowerCase(),
                            password: null,
                            firstName,
                            lastName,
                            googleId,
                            profileImage,
                            isEmailVerified: true,
                            isActive: true,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                        await user.save();
                        console.log('✅ New user created via Google OAuth:', email);
                    }

                    return done(null, user);
                } catch (error) {
                    console.error('Google OAuth error:', error);
                    return done(error as Error, undefined);
                }
            }
        )
    );
    console.log('✅ Google OAuth strategy configured');
} else {
    console.warn('⚠️  Google OAuth not configured (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET missing)');
}


// Serialize user for session
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findOne({ id });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
