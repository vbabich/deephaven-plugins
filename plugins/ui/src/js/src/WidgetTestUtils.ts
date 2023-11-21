import { WidgetDefinition } from '@deephaven/dashboard';
import { TestUtils } from '@deephaven/utils';
import { JsWidget, WidgetWrapper } from './WidgetTypes';

export function makeDocumentUpdatedJsonRpc(
  document: Record<string, unknown> = {}
) {
  return {
    jsonrpc: '2.0',
    method: 'documentUpdated',
    params: [document],
  };
}

export function makeDocumentUpdatedJsonRpcString(
  document: Record<string, unknown> = {}
) {
  return JSON.stringify(makeDocumentUpdatedJsonRpc(document));
}

export function makeWidgetDefinition({
  id = 'widget-id',
  type = 'widget-type',
  title = 'Widget Title',
} = {}): WidgetDefinition {
  return {
    id,
    type,
    title,
  };
}

export function makeWidget({
  addEventListener = jest.fn(() => jest.fn()),
  getDataAsString = () => makeDocumentUpdatedJsonRpcString(),
}: Partial<JsWidget> = {}): JsWidget {
  return TestUtils.createMockProxy<JsWidget>({
    addEventListener,
    getDataAsString,
  });
}

export function makeWidgetWrapper({
  definition = makeWidgetDefinition(),
  fetch = () => Promise.resolve(makeWidget()),
}: Partial<WidgetWrapper> = {}): WidgetWrapper {
  return {
    id: definition.id ?? 'widget-id',
    definition,
    fetch,
  };
}