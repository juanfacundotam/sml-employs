import Detail from "../Lideres/Employees_components/Detail/Detail";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-nzhxzzb0uswslgg5.us.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `https://${domain}/api/v2/`,
                        scope: "read:current_user",
                    },
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e) {
                (e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    return (
        
        isAuthenticated && (
            <div>{(useAuth0)}
                {(useAuth0())}
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <h3>User Metadata</h3>
                {userMetadata ? (
                    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                ) : (
                    "No user metadata defined"
                )}
                <Detail
                    name={user.name}
                    picture={user.picture}
                    email={user.email}
                />
            </div>
        )
    );
};

export default Profile;