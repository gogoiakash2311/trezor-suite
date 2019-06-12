import styled from 'styled-components';
import suiteConfig from '@suite-config/index';
import React, { PureComponent } from 'react';
import { Link, colors, icons as ICONS } from '@trezor/components';
import { FormattedMessage } from 'react-intl';
import l10nCommonMessages from '@suite-views/index.messages';
import Divider from '../Divider';
import RowCoin from '../RowCoin';

import l10nMessages from './index.messages';

const Wrapper = styled.div`
    width: 100%;
`;

const ExternalWallet = styled.div`
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`;

const Empty = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
`;

const StyledLinkEmpty = styled(Link)`
    padding: 0;
`;

const Gray = styled.span`
    color: ${colors.TEXT_SECONDARY};
`;

class CoinMenu extends PureComponent {
    getBaseUrl() {
        const { selectedDevice } = this.props.wallet;
        let baseUrl = '';
        if (selectedDevice && selectedDevice.features) {
            baseUrl = `/device/${selectedDevice.features.device_id}`;
            if (selectedDevice.instance) {
                baseUrl += `:${selectedDevice.instance}`;
            }
        }

        return baseUrl;
    }

    getOtherCoins() {
        // const { hiddenCoinsExternal } = this.props.wallet;
        return (
            suiteConfig.EXTERNAL_COINS.sort((a, b) => a.order - b.order)
                .filter(item => !item.isHidden) // hide coins globally in config
                // .filter(item => !hiddenCoinsExternal.includes(item.id))
                .map(coin => {
                    const row = (
                        <RowCoin
                            network={{
                                name: coin.coinName,
                                shortcut: coin.id,
                            }}
                            iconRight={{
                                type: ICONS.SKIP,
                                color: colors.TEXT_SECONDARY,
                                size: 13,
                            }}
                        />
                    );

                    if (coin.external)
                        return (
                            <ExternalWallet
                                key={coin.id}
                                onClick={() => this.props.gotoExternalWallet(coin.id, coin.url)}
                            >
                                {row}
                            </ExternalWallet>
                        );
                    return (
                        <StyledLink isGray key={coin.id} href={coin.url} target="_top">
                            {row}
                        </StyledLink>
                    );
                })
        );
    }

    getEmptyContent() {
        return (
            <Empty>
                <Gray>
                    <FormattedMessage
                        {...l10nMessages.TR_SELECT_COINS}
                        values={{
                            TR_SELECT_COINS_LINK: (
                                <StyledLinkEmpty to="/settings">
                                    <FormattedMessage
                                        {...l10nCommonMessages.TR_SELECT_COINS_LINK}
                                    />
                                </StyledLinkEmpty>
                            ),
                        }}
                    />{' '}
                </Gray>
            </Empty>
        );
    }

    // isTopMenuEmpty() {
    //     const numberOfVisibleNetworks = this.props.localStorage.config.networks
    //         .filter(item => !item.isHidden) // hide coins globally in config
    //         .filter(item => !this.props.wallet.hiddenCoins.includes(item.shortcut));

    //     return numberOfVisibleNetworks.length <= 0;
    // }

    // isBottomMenuEmpty() {
    //     const { hiddenCoinsExternal } = this.props.wallet;
    //     const numberOfVisibleNetworks = coins
    //         .filter(item => !item.isHidden)
    //         .filter(item => !hiddenCoinsExternal.includes(item.id));

    //     return numberOfVisibleNetworks.length <= 0;
    // }

    // isMenuEmpty() {
    //     return this.isTopMenuEmpty() && this.isBottomMenuEmpty();
    // }

    render() {
        // const { hiddenCoins } = this.props.wallet;
        // const { config } = this.props.localStorage;
        return (
            <Wrapper data-test="Main__page__coin__menu">
                {/* {this.isMenuEmpty() || (this.isTopMenuEmpty() && this.getEmptyContent())} */}
                {/* {config.networks
                    // .filter(item => !item.isHidden) // hide coins globally in config
                    // .filter(item => !hiddenCoins.includes(item.shortcut)) // hide coins by user settings
                    .sort((a, b) => a.order - b.order)
                    .map(item => (
                        <NavLink
                            key={item.shortcut}
                            to={`${this.getBaseUrl()}/network/${item.shortcut}/account/0`}
                        >
                            <RowCoin
                                network={{
                                    name: item.name,
                                    shortcut: item.shortcut,
                                }}
                            />
                        </NavLink>
                    ))} */}
                <Divider
                    testId="Main__page__coin__menu__divider"
                    textLeft={<FormattedMessage {...l10nMessages.TR_OTHER_COINS} />}
                    hasBorder
                />
                {this.getOtherCoins()}
                {/* {!this.isMenuEmpty() && (
                    
                )}
                {this.isBottomMenuEmpty() && this.getEmptyContent()}
                {!this.isBottomMenuEmpty() && this.getOtherCoins()} */}
            </Wrapper>
        );
    }
}

export default CoinMenu;
