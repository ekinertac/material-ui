import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { alpha } from '@mui/system';
import CancelIcon from '../internal/svg-icons/Cancel';
import useForkRef from '../utils/useForkRef';
import unsupportedProp from '../utils/unsupportedProp';
import capitalize from '../utils/capitalize';
import ButtonBase from '../ButtonBase';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import chipClasses, { getChipUtilityClass } from './chipClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, disabled, size, color, onDelete, clickable, variant } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      disabled && 'disabled',
      `size${capitalize(size)}`,
      `color${capitalize(color)}`,
      clickable && 'clickable',
      clickable && `clickableColor${capitalize(color)}`,
      onDelete && 'deletable',
      onDelete && `deletableColor${capitalize(color)}`,
      `${variant}${capitalize(color)}`,
    ],
    label: ['label', `label${capitalize(size)}`],
    avatar: ['avatar', `avatar${capitalize(size)}`, `avatarColor${capitalize(color)}`],
    icon: ['icon', `icon${capitalize(size)}`, `iconColor${capitalize(color)}`],
    deleteIcon: [
      'deleteIcon',
      `deleteIcon${capitalize(size)}`,
      `deleteIconColor${capitalize(color)}`,
      `deleteIconOutlinedColor${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getChipUtilityClass, classes);
};

const ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { color, clickable, onDelete, size, variant } = ownerState;

    return [
      { [`& .${chipClasses.avatar}`]: styles.avatar },
      { [`& .${chipClasses.avatar}`]: styles[`avatar${capitalize(size)}`] },
      { [`& .${chipClasses.avatar}`]: styles[`avatarColor${capitalize(color)}`] },
      { [`& .${chipClasses.icon}`]: styles.icon },
      { [`& .${chipClasses.icon}`]: styles[`icon${capitalize(size)}`] },
      { [`& .${chipClasses.icon}`]: styles[`iconColor${capitalize(color)}`] },
      { [`& .${chipClasses.deleteIcon}`]: styles.deleteIcon },
      { [`& .${chipClasses.deleteIcon}`]: styles[`deleteIcon${capitalize(size)}`] },
      { [`& .${chipClasses.deleteIcon}`]: styles[`deleteIconColor${capitalize(color)}`] },
      { [`& .${chipClasses.deleteIcon}`]: styles[`deleteIconOutlinedColor${capitalize(color)}`] },
      styles.root,
      styles[`size${capitalize(size)}`],
      styles[`color${capitalize(color)}`],
      clickable && styles.clickable,
      clickable && color !== 'default' && styles[`clickableColor${capitalize(color)})`],
      onDelete && styles.deletable,
      onDelete && color !== 'default' && styles[`deletableColor${capitalize(color)}`],
      styles[variant],
      variant === 'outlined' && styles[`outlined${capitalize(color)}`],
    ];
  },
})(
  ({ theme, ownerState }) => {
    const deleteIconColor = alpha(theme.palette.text.primary, 0.26);

    return {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.action.selected,
      borderRadius: 32 / 2,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['background-color', 'box-shadow']),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      textDecoration: 'none',
      border: 0, // Remove `button` border
      padding: 0, // Remove `button` padding
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      [`&.${chipClasses.disabled}`]: {
        opacity: theme.palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      [`& .${chipClasses.avatar}`]: {
        marginLeft: 5,
        marginRight: -6,
        width: 24,
        height: 24,
        color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
        fontSize: theme.typography.pxToRem(12),
      },
      [`& .${chipClasses.avatarColorPrimary}`]: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
      },
      [`& .${chipClasses.avatarColorSecondary}`]: {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.dark,
      },
      [`& .${chipClasses.avatarSmall}`]: {
        marginLeft: 4,
        marginRight: -4,
        width: 18,
        height: 18,
        fontSize: theme.typography.pxToRem(10),
      },
      [`& .${chipClasses.icon}`]: {
        color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
        marginLeft: 5,
        marginRight: -6,
        ...(ownerState.size === 'small' && {
          fontSize: 18,
          marginLeft: 4,
          marginRight: -4,
        }),
        ...(ownerState.color !== 'default' && {
          color: 'inherit',
        }),
      },
      [`& .${chipClasses.deleteIcon}`]: {
        WebkitTapHighlightColor: 'transparent',
        color: deleteIconColor,
        fontSize: 22,
        cursor: 'pointer',
        margin: '0 5px 0 -6px',
        '&:hover': {
          color: alpha(deleteIconColor, 0.4),
        },
        ...(ownerState.size === 'small' && {
          fontSize: 16,
          marginRight: 4,
          marginLeft: -4,
        }),
        ...(ownerState.color !== 'default' && {
          color: alpha(theme.palette[ownerState.color].contrastText, 0.7),
          '&:hover, &:active': {
            color: theme.palette[ownerState.color].contrastText,
          },
        }),
      },
      ...(ownerState.size === 'small' && {
        height: 24,
      }),
      ...(ownerState.color !== 'default' && {
        backgroundColor: theme.palette[ownerState.color].main,
        color: theme.palette[ownerState.color].contrastText,
      }),
      ...(ownerState.onDelete && {
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: alpha(
            theme.palette.action.selected,
            theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
          ),
        },
      }),
      ...(ownerState.onDelete &&
        ownerState.color !== 'default' && {
          [`&.${chipClasses.focusVisible}`]: {
            backgroundColor: theme.palette[ownerState.color].dark,
          },
        }),
    };
  },
  ({ theme, ownerState }) => ({
    ...(ownerState.clickable && {
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.action.selected,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
      },
      [`&.${chipClasses.focusVisible}`]: {
        backgroundColor: alpha(
          theme.palette.action.selected,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
        ),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
      },
    }),
    ...(ownerState.clickable &&
      ownerState.color !== 'default' && {
        [`&:hover, &.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.palette[ownerState.color].dark,
        },
      }),
  }),
  ({ theme, ownerState }) => ({
    ...(ownerState.variant === 'outlined' && {
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]
      }`,
      [`&.${chipClasses.clickable}:hover`]: {
        backgroundColor: theme.palette.action.hover,
      },
      [`&.${chipClasses.focusVisible}`]: {
        backgroundColor: theme.palette.action.focus,
      },
      [`& .${chipClasses.avatar}`]: {
        marginLeft: 4,
      },
      [`& .${chipClasses.avatarSmall}`]: {
        marginLeft: 2,
      },
      [`& .${chipClasses.icon}`]: {
        marginLeft: 4,
      },
      [`& .${chipClasses.iconSmall}`]: {
        marginLeft: 2,
      },
      [`& .${chipClasses.deleteIcon}`]: {
        marginRight: 5,
      },
      [`& .${chipClasses.deleteIconSmall}`]: {
        marginRight: 3,
      },
    }),
    ...(ownerState.variant === 'outlined' &&
      ownerState.color !== 'default' && {
        color: theme.palette[ownerState.color].main,
        border: `1px solid ${alpha(theme.palette[ownerState.color].main, 0.7)}`,
        [`&.${chipClasses.clickable}:hover`]: {
          backgroundColor: alpha(
            theme.palette[ownerState.color].main,
            theme.palette.action.hoverOpacity,
          ),
        },
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: alpha(
            theme.palette[ownerState.color].main,
            theme.palette.action.focusOpacity,
          ),
        },
        [`& .${chipClasses.deleteIcon}`]: {
          color: alpha(theme.palette[ownerState.color].main, 0.7),
          '&:hover, &:active': {
            color: theme.palette[ownerState.color].main,
          },
        },
      }),
  }),
);

const ChipLabel = styled('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { size } = ownerState;

    return [styles.label, styles[`label${capitalize(size)}`]];
  },
})(({ ownerState }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: 'nowrap',
  ...(ownerState.size === 'small' && {
    paddingLeft: 8,
    paddingRight: 8,
  }),
}));

function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = React.forwardRef(function Chip(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiChip' });
  const {
    avatar: avatarProp,
    className,
    clickable: clickableProp,
    color = 'default',
    component: ComponentProp,
    deleteIcon: deleteIconProp,
    disabled = false,
    icon: iconProp,
    label,
    onClick,
    onDelete,
    onKeyDown,
    onKeyUp,
    size = 'medium',
    variant = 'filled',
    ...other
  } = props;

  const chipRef = React.useRef(null);
  const handleRef = useForkRef(chipRef, ref);

  const handleDeleteIconClick = (event) => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };

  const handleKeyDown = (event) => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      // Will be handled in keyUp, otherwise some browsers
      // might init navigation
      event.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleKeyUp = (event) => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      } else if (event.key === 'Escape' && chipRef.current) {
        chipRef.current.blur();
      }
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  };

  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const small = size === 'small';

  const component = clickable || onDelete ? ButtonBase : ComponentProp || 'div';

  const ownerState = {
    ...props,
    component,
    disabled,
    size,
    color,
    onDelete: !!onDelete,
    clickable,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const moreProps =
    component === ButtonBase
      ? {
          component: ComponentProp || 'div',
          focusVisibleClassName: classes.focusVisible,
          ...(onDelete && { disableRipple: true }),
        }
      : {};

  let deleteIcon = null;
  if (onDelete) {
    const customClasses = clsx({
      [classes.deleteIconSmall]: small,
      [classes[`deleteIconColor${capitalize(color)}`]]:
        color !== 'default' && variant !== 'outlined',
      [classes[`deleteIconOutlinedColor${capitalize(color)}`]]:
        color !== 'default' && variant === 'outlined',
    });

    deleteIcon =
      deleteIconProp && React.isValidElement(deleteIconProp) ? (
        React.cloneElement(deleteIconProp, {
          className: clsx(deleteIconProp.props.className, classes.deleteIcon, customClasses),
          onClick: handleDeleteIconClick,
        })
      ) : (
        <CancelIcon
          className={clsx(classes.deleteIcon, customClasses)}
          onClick={handleDeleteIconClick}
        />
      );
  }

  let avatar = null;
  if (avatarProp && React.isValidElement(avatarProp)) {
    avatar = React.cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className),
    });
  }

  let icon = null;
  if (iconProp && React.isValidElement(iconProp)) {
    icon = React.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className),
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    if (avatar && icon) {
      console.error(
        'MUI: The Chip component can not handle the avatar ' +
          'and the icon prop at the same time. Pick one.',
      );
    }
  }

  return (
    <ChipRoot
      as={component}
      className={clsx(classes.root, className)}
      disabled={clickable && disabled ? true : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={handleRef}
      ownerState={ownerState}
      {...moreProps}
      {...other}
    >
      {avatar || icon}
      <ChipLabel className={clsx(classes.label)} ownerState={ownerState}>
        {label}
      </ChipLabel>
      {deleteIcon}
    </ChipRoot>
  );
});

Chip.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The Avatar element to display.
   */
  avatar: PropTypes.element,
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: PropTypes.bool,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: PropTypes.element,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Icon element.
   */
  icon: PropTypes.element,
  /**
   * The content of the component.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined']),
    PropTypes.string,
  ]),
};

export default Chip;
