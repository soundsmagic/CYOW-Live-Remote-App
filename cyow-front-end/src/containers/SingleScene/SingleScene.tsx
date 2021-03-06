import { useLazyLaunchSceneQuery } from '../../api/remoteScriptsApi';
import { Scene } from '../../types/types';
import { StyledSingleScene } from './styled';

export const SingleScene = ({ sceneIndex, sceneName }: Scene) => {
    const [launchScene] = useLazyLaunchSceneQuery();
    const onClickHandler = () => {
        launchScene(sceneIndex);
    };
    return (
        <StyledSingleScene onClick={onClickHandler}>
            <span>{sceneName ? sceneName : sceneIndex + 1}</span>
        </StyledSingleScene>
    );
};