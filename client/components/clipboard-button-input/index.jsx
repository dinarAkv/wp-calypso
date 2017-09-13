/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { omit } from 'lodash';
import i18n from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { withoutHttp } from 'lib/url';
import ClipboardButton from 'components/forms/clipboard-button';
import FormTextInput from 'components/forms/form-text-input';

class ClipboardButtonInputExport extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			isCopied: false,
			disabled: false
		};
	}
	render() {
		const { value, className, disabled, hideHttp } = this.props;
		const classes = classnames( 'clipboard-button-input', className );

		return (
			<span className={ classes }>
				<FormTextInput
					{ ...omit( this.props, 'className', 'hideHttp' ) }
					value={ hideHttp ? withoutHttp( value ) : value }
					type="text"
					selectOnFocus
					readOnly />
				<ClipboardButton
					text={ value }
					onCopy={ this.showConfirmation }
					disabled={ disabled }
					compact>
					{ this.state.isCopied
						? i18n.translate( 'Copied!' )
						: i18n.translate( 'Copy', { context: 'verb' } ) }
				</ClipboardButton>
			</span>
		);
	}
	getDefaultProps() {
		return {
			value: ''
		};
	}

	componentWillUnmount() {
		clearTimeout( this.confirmationTimeout );
		delete this.confirmationTimeout;
	}

	showConfirmation() {
		this.setState( {
			isCopied: true
		} );

		this.confirmationTimeout = setTimeout( () => {
			this.setState( {
				isCopied: false
			} );
		}, 4000 );
	}
}

ClipboardButtonInputExport.displayName = 'ClipboardButtonInput';

ClipboardButtonInputExport.propTypes = {
	value: PropTypes.string,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	hideHttp: PropTypes.bool
};

export default ClipboardButtonInputExport;
