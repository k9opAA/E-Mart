import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            
            if (!user) {
                navigate('/');
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, "Users", user.uid));
                if (userDoc.exists()) {
                    setUserData({
                        ...userDoc.data(),
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL
                    });
                } else {
                    setUserData({
                        firstName: user.displayName || user.email.split('@')[0],
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="container py-8">
                <div className="profile-loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="profile-container">
                <h1 className="profile-title">My Profile</h1>
                
                <div className="profile-card">
                    <div className="profile-header">
                        {userData?.photoURL ? (
                            <img 
                                src={userData.photoURL} 
                                alt={userData.firstName}
                                className="profile-avatar-large"
                            />
                        ) : (
                            <div className="profile-avatar-large">
                                {userData?.firstName?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <h2>{userData?.firstName} {userData?.lastName}</h2>
                        <p className="profile-email">{userData?.email}</p>
                    </div>

                    <div className="profile-details">
                        <div className="profile-detail-item">
                            <label>Your Name</label>
                            <p>{userData?.firstName || 'N/A'}</p>
                        </div>
                        <div className="profile-detail-item">
                            <label>Email Address</label>
                            <p>{userData?.email}</p>
                        </div>
                        <div className="profile-detail-item">
                            <label>User ID</label>
                            <p className="text-muted">{userData?.uid}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
