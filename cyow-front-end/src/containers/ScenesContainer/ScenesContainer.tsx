import { useGetScenesQuery } from '../../api/remoteScriptsApi';
import { SingleScene } from '../SingleScene/SingleScene';
import { StyledScenesContainer } from './styled';

export const ScenesContainer = () => {
    const { data, error, isLoading } = useGetScenesQuery();
    return (
        <>
            {isLoading && <h3>Loading...</h3>}
            {error && <pre style={{ 'wordBreak': 'break-word' }}>{JSON.stringify(error, undefined, 2)}</pre>}
            {data && !isLoading && !error &&
                <StyledScenesContainer>
                    {Array.from(Array(data).keys()).map((item) => <SingleScene key={item} sceneIndex={item} />)}
                </StyledScenesContainer>}
        </>
    );
};
