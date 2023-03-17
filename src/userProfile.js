import { useAuth0 } from '@auth0/auth0-react';
import { ref, onValue, get, set } from "firebase/database";
import styled from 'styled-components';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { db } from './firebase';

const Profile = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 10px;
    align-items: center;
    margin-bottom: -20px;
    button {
        width: 70px;
        height: 30px;
    }
`;

const initalCities = [
    {name: 'Austin, Texas, US', longitude: -97.74306, latitude: 30.26715, timezone: 'America/Chicago'},
    {name: 'Dallas, Texas, US', longitude: -96.80667, latitude: 32.78306, timezone: 'America/Chicago'},
    {name: 'Houston, Texas, US', longitude: -95.36327, latitude: 29.76328, timezone: 'America/Chicago'}
];



function UserProfile(){
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    if (!isAuthenticated){
      return (
        <Profile>
          <p>Not Logged In</p>
          <LoginButton/>
        </Profile>
      )
    }
    const username = user.email.split("@")[0]
    const userProf = ref(db, 'users/' + username);
    onValue(userProf, (snapshot) => {
        const data = snapshot.val();
        if(!data){
            set(ref(db, 'users/' + username), {
                citites: initalCities,
            });
        }
    });
    return (
      <Profile>
        <p>{user.name || user.email}</p>
        <LogoutButton/>
      </Profile>
    )
    
}

export default UserProfile;