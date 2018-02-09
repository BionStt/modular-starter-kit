import React, { PureComponent } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  ButtonDropdown,
  DropdownToggle,
  Collapse
} from 'reactstrap';
import classnames from 'classnames';

export default class StandardPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      collapse: props.collapse || false,
      fullScreen: false
    };
  }

  collapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  dropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  };

  fullScreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  };

  render() {
    return (
      <Card
        className={classnames(
          { 'b-panel-fullscreen': this.state.fullScreen },
          'b-panel',
          'clearfix',
          this.props.className
        )}
      >
        {!this.props.noHeader && (
          <CardHeader onClick={this.collapse}>
            <h3 className="b-panel-title">
              {this.props.showIcon && (
                <i
                  className={classnames(
                    { [`${this.props.icon}`]: this.props.icon },
                    { 'icon-notebook': !this.props.icon },
                    'b-icon'
                  )}
                />
              )}
              {this.props.title || 'No title'}
            </h3>

            <span
              className="b-panel-actions"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {this.props.actions && (
                <ButtonDropdown
                  isOpen={this.state.dropdown}
                  toggle={this.dropdown}
                >
                  <DropdownToggle color="link" size="xs">
                    <i className="icon-arrow-down" />
                  </DropdownToggle>

                  {this.props.actions || ''}
                </ButtonDropdown>
              )}
              {this.props.showMaximize && (
                <i
                  className={classnames(
                    { 'icon-size-fullscreen': !this.state.fullScreen },
                    { 'icon-size-actual': this.state.fullScreen },
                    'b-icon'
                  )}
                  onClick={this.fullScreen}
                />
              )}
              &nbsp;&nbsp;
              <i className="icon-close b-icon" />
            </span>
          </CardHeader>
        )}

        <Collapse isOpen={!this.state.collapse}>
          <CardBody className="card-body">{this.props.children}</CardBody>
        </Collapse>
      </Card>
    );
  }
}
