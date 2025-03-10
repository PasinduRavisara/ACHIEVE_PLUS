function MetricsSummary({ metrics }) {
    return (
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Tasks Completed</h5>
              <div className="d-flex justify-content-between">
                <div>
                  <h2 className="display-4">{metrics.totalTasksCompletedMonth}</h2>
                  <p>This period</p>
                </div>
                <div className="text-end">
                  <h3>{metrics.totalTasksCompletedOverall}</h3>
                  <p>Overall</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body">
              <h5 className="card-title">Tasks In Progress</h5>
              <div className="d-flex justify-content-between">
                <div>
                  <h2 className="display-4">{metrics.tasksInProgress}</h2>
                  <p>Current tasks</p>
                </div>
                <div className="text-end">
                  <h3>{metrics.completionRate}%</h3>
                  <p>Completion rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Points Earned</h5>
              <div className="d-flex justify-content-between">
                <div>
                  <h2 className="display-4">{metrics.pointsEarnedMonth}</h2>
                  <p>This period</p>
                </div>
                <div className="text-end">
                  <h3>{metrics.pointsEarnedTotal}</h3>
                  <p>Overall</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default MetricsSummary;