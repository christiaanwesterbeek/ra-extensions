# react-admin extensions

Let's start of by saying that react-admin rocks! That means the people building and supporting it are really all-in with this framework. I'm using it for all my clients. Sometimes it happens that a feature or component is requested, but it isn't getting added to react-admin. In those cases it's often said that they won't add and it can be solved in userland. I respect that.

Welcome to userland 👥!

This repo is here to provide an additional set of components, hooks, action, etc that are not added (yet) to react-admin itself.

## Available extensions

- button
  - BulkExportButton

Can't find what you're looking for? Either propose your component or addition in a PR. Or create an issue to request it.

Also, many packages have been already been [published by the community](https://marmelab.com/react-admin/Ecosystem.html) that augment react-admin. Most of them provide one functionality or component. The intention of this repo is to house many (unrelated) components that we as a community can contribute to and use.

## Installation

`yarn add ra-extensions`

## Usage

### BulkExportButton

```javascript
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Datagrid, downloadCSV, List, TextField } from 'react-admin';
import { unparse as convertToCSV } from 'papaparse/papaparse.min';
import { BulkExportButton } from 'ra-extensions';

const exporter = data => {
    const csv = convertToCSV({
        data,
        fields: ['id', 'b', 'c'],
    });
    downloadCSV(csv, 'somelist'); // download as 'somelist.csv` file
};

const BulkActionButtons = ({ resource, selectedIds }) => (
    <Fragment>
        <BulkExportButton
            resource={resource}
            selectedIds={selectedIds}
            exporter={exporter}
        />
    </Fragment>
);
BulkActionButtons.propTypes = {
    resource: PropTypes.string,
    selectedIds: PropTypes.array,
};

const SomeList = props => (
    <List
        {...props}
        bulkActionButtons={<BulkActionButtons />}
        exporter={exporter}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="b" />
            <TextField source="c" />
        </Datagrid>
    </List>
);

export default SomeList;
```



### Translation

Add the extra translations that some components may require.

```javascript
// standard react-admin translations
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';

// ra-extensions translations
import { raxMessages } from 'ra-extensions';

// your own translations
import * as domainMessages from './i18n';

const messages = {
    fr: { ...frenchMessages, ...raxMessages.fr, ...domainMessages.fr },
    en: { ...englishMessages, ...raxMessages.en, ...domainMessages.en },
};
const i18nProvider = locale => messages[locale];

const App = () => (
    <Admin i18nProvider={i18nProvider}>
        ...
    </Admin>
);
```

## There's more
