import a from 'assertron';
import { TestResults } from 'test-progress-tracker';
import ProgressReporter from '.';
import { noCoverage } from './testResultsExamples';
import { anything } from 'satisfier';

test('mark filtered if there is testNamePattern', () => {
  const subject = new ProgressReporter({ testNamePattern: 'a' } as jest.GlobalConfig)
  let actual: TestResults
  subject.appendTestResult = (_, results) => {
    actual = results
    return Promise.resolve()
  }
  subject.onRunComplete(undefined, aggregateResult(noCoverage))

  a.satisfies(actual!, { ...noCoverage, duration: anything, filtered: true })
})

test('mark filtered if there is testPathPattern', () => {
  const subject = new ProgressReporter({ testPathPattern: 'a' } as jest.GlobalConfig)
  let actual: TestResults
  subject.appendTestResult = (_, results) => {
    actual = results
    return Promise.resolve()
  }
  subject.onRunComplete(undefined, aggregateResult(noCoverage))

  a.satisfies(actual!, { ...noCoverage, duration: anything, filtered: true })
})

test('mark filtered if there is testNamePattern and testPathPattern', () => {
  const subject = new ProgressReporter({ testNamePattern: 'y', testPathPattern: 'a' } as jest.GlobalConfig)
  let actual: TestResults
  subject.appendTestResult = (_, results) => {
    actual = results
    return Promise.resolve()
  }
  subject.onRunComplete(undefined, aggregateResult(noCoverage))

  a.satisfies(actual!, { ...noCoverage, duration: anything, filtered: true })
})

test('not filtered if there is no testNamePattern or testPathPattern', () => {
  const subject = new ProgressReporter({} as jest.GlobalConfig)
  let actual: TestResults
  subject.appendTestResult = (_, results) => {
    actual = results
    return Promise.resolve()
  }
  subject.onRunComplete(undefined, aggregateResult(noCoverage))

  a.satisfies(actual!, e => e.filtered === undefined)
})

test('no test will not append', () => {
  const subject = new ProgressReporter({} as jest.GlobalConfig)
  subject.appendTestResult = () => { throw new Error('should not call') }
  subject.onRunComplete(undefined, aggregateResult({} as any))
})

function aggregateResult(testResults: TestResults) {
  const result: jest.AggregatedResult = { ...testResults } as any
  if (testResults.coverage) {
    result.coverageMap = {
      getCoverageSummary() { return testResults.coverage }
    } as any
  }

  return result
}
